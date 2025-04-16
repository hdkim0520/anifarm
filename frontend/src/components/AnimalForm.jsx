import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AnimalForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 수정 모드일 경우 id 존재
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // 수정 모드면 기존 데이터 가져오기
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8001/api/animals/${id}/`)
        .then((res) => {
          setName(res.data.name);
          setAge(res.data.age);
        })
        .catch((err) => {
          console.error('불러오기 에러:', err);
          navigate('/');
        });
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, age: parseInt(age) };

    const request = id
      ? axios.put(`http://localhost:8001/api/animals/${id}/`, data)
      : axios.post(`http://localhost:8001/api/animals/`, data);

    request
      .then(() => {
        alert(id ? '수정 완료!' : '등록 완료!');
        navigate('/');
      })
      .catch((err) => {
        console.error('저장 실패:', err);
        alert('오류가 발생했습니다.');
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{id ? '✏️ 동물 수정' : '➕ 동물 등록'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {id ? '수정하기' : '등록하기'}
        </button>
      </form>
    </div>
  );
};

export default AnimalForm;

