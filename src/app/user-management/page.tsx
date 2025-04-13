'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

type SortDirection = 'asc' | 'desc';
type RoleFilter = 'all' | 'user' | 'admin';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleFilter>('all');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'user'
  });

  useEffect(() => {
    // 목데이터로 사용자 목록 설정
    const mockUsers: User[] = [
      {
        id: 1,
        username: 'test',
        email: 'test@example.com',
        role: 'user'
      },
      {
        id: 2,
        username: 'admin',
        email: 'admin@example.com',
        role: 'admin'
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setLoading(false);
  }, []);

  useEffect(() => {
    // 역할 필터링 적용
    const filtered = users.filter(user => 
      selectedRole === 'all' ? true : user.role === selectedRole
    );
    setFilteredUsers(filtered);
  }, [selectedRole, users]);

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setFilteredUsers(sortedUsers);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleRoleFilter = (role: RoleFilter) => {
    setSelectedRole(role);
    setShowFilterModal(false);
  };

  const handleAddUser = () => {
    const newId = Math.max(...users.map(user => user.id)) + 1;
    const userToAdd = {
      id: newId,
      ...newUser
    };
    
    setUsers([...users, userToAdd]);
    setNewUser({
      username: '',
      email: '',
      role: 'user'
    });
    setShowAddModal(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">유저 관리</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          유저 추가
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={handleSort}
              >
                ID {sortDirection === 'asc' ? '↑' : '↓'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                사용자명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이메일
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => setShowFilterModal(true)}
              >
                <div className="flex items-center">
                  역할
                  <span className="ml-1 text-xs">
                    {selectedRole !== 'all' ? `(${selectedRole})` : '▼'}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 필터 모달 */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">역할 필터</h2>
            <div className="space-y-2">
              <button
                onClick={() => handleRoleFilter('all')}
                className={`w-full px-4 py-2 rounded ${
                  selectedRole === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => handleRoleFilter('user')}
                className={`w-full px-4 py-2 rounded ${
                  selectedRole === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                일반 사용자
              </button>
              <button
                onClick={() => handleRoleFilter('admin')}
                className={`w-full px-4 py-2 rounded ${
                  selectedRole === 'admin'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                관리자
              </button>
            </div>
            <button
              onClick={() => setShowFilterModal(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 유저 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">새 유저 추가</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용자명
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="사용자명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="이메일을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  역할
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="user">일반 사용자</option>
                  <option value="admin">관리자</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 