import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNode, updateNode } from '../redux/treeSlice';

const Modal = ({ node, onClose }) => {
  const [title, setTitle] = useState(node?.title || '');
  const [question, setQuestion] = useState(node?.question || '');
  const [children, setChildren] = useState(node?.children || '');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!title || !question || children === '') {
      setError('All fields are mandatory');
      return;
    }
    if (node) {
      dispatch(updateNode({ ...node, title, question, children: parseInt(children) }));
    } else {
      dispatch(addNode({ id: Date.now(), title, question, children: parseInt(children) }));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="text-lg font-bold mb-4">{node ? 'Edit Node' : 'Add Node'}</h3>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" placeholder="Title" className="w-full mb-2 p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Question" className="w-full mb-2 p-2 border rounded" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <input type="number" placeholder="Number of Children" className="w-full mb-2 p-2 border rounded" value={children} onChange={(e) => setChildren(e.target.value)} />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white rounded">Add +</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
