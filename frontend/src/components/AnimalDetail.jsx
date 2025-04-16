import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AnimalDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/animals/${id}/`)
      .then((res) => setAnimal(res.data))
      .catch((err) => console.error('상세 불러오기 에러:', err));
  }, [id]);

  if (!animal) return <div>로딩 중...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">🐾 동물 상세 정보</h1>
      <p><strong>이름:</strong> {animal.name}</p>
      <p><strong>나이:</strong> {animal.age}세</p>
      <Link to="/" className="mt-4 inline-block text-blue-500 underline">← 목록으로 돌아가기</Link>
    </div>
  );
};

const handleDelete = () => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    axios.delete(`http://localhost:8001/api/animals/${id}/`)
      .then(() => {
        alert('삭제되었습니다!');
        navigate('/');
      })
      .catch((err) => console.error('삭제 실패:', err));
  }
};

export default AnimalDetail;

