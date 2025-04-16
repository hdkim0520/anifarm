import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8001/api/animals/')
      .then((res) => {
        setAnimals(res.data);
      })
      .catch((err) => {
        console.error('API 요청 에러:', err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:8001/api/animals/${id}/`)
        .then(() => {
          setAnimals((prev) => prev.filter((a) => a.id !== id));
        })
        .catch((err) => {
          console.error('삭제 실패:', err);
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="p-6 w-full mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">🐾 동물 목록</h1>
      <Link to="/add" className="text-blue-400 hover:underline mb-4 inline-block">
        + 동물 추가
      </Link>
      <ul className="space-y-2">
        {animals.map((animal) => (
          <li key={animal.id} className="bg-gray-800 px-4 py-2 rounded">
            <div className="flex flex-nowrap items-center">
              <div className="min-w-0 flex-1 truncate">
                <span>🐾 {animal.name} ({animal.age}세)</span>
              </div>
              <div className="flex gap-1 ml-2 shrink-0">
                <button
                  onClick={() => handleEdit(animal.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-1 py-1 rounded text-xs"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(animal.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded text-xs"
                >
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalList;
