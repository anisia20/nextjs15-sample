import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// 목 사용자 데이터
const mockUsers = [
  { 
    id: 1, 
    username: 'test', 
    password: 'test',
    email: 'test@example.com',
    role: 'user'
  }
];

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

// 토큰 생성 함수
const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      role: user.role
    },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { 
      id: user.id,
      username: user.username
    },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // 환경 변수에 따라 목데이터 사용 여부 결정
    const useMockData = process.env.USE_MOCK_DATA === 'true';
    
    if (!useMockData) {
      // 실제 API 연동 시 여기에 실제 데이터베이스 쿼리 로직 추가
      return NextResponse.json(
        { message: '실제 API 연동이 필요합니다' },
        { status: 501 }
      );
    }

    // 목데이터에서 사용자 찾기
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    
    if (!user) {
      return NextResponse.json(
        { message: '사용자 이름 또는 비밀번호가 잘못되었습니다' },
        { status: 401 }
      );
    }
    
    // 토큰 생성
    const { accessToken, refreshToken } = generateTokens(user);
    
    // 응답 헤더에 토큰 설정
    const response = NextResponse.json(
      { 
        message: '로그인 성공',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    );

    // 쿠키에 토큰 저장
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 // 15분
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7일
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `서버 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
