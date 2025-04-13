'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // 쿠키를 포함하여 요청
      });
      
      if (response.ok) {
        const data = await response.json();
        const user: User = data.user;
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/user-management');
      } else {
        const data = await response.json();
        setError(data.message || '로그인에 실패했습니다');
      }
    } catch (error) {
      setError(`로그인 중 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">로그인</h1>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium" htmlFor="username">
              사용자 이름
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
