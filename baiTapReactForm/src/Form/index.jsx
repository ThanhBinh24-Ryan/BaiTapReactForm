import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, deleteStudent, updateStudent } from './Redux/studentSlice';
import './scss/index.scss';

export default function ReactForm() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .required('Vui lòng nhập tên'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Số điện thoại chỉ chứa số')
        .min(10, 'Số điện thoại phải có ít nhất 10 số')
        .required('Vui lòng nhập số điện thoại'),
      email: Yup.string()
        .email('Email không hợp lệ')
        .required('Vui lòng nhập email'),
    }),
    onSubmit: (values) => {
        if (editingStudent) {
          dispatch(updateStudent(values));
          setEditingStudent(null);
        } else {
          dispatch(addStudent(values)); // Không tự động tạo `id`
        }
        formik.resetForm();
      },
      
  });

  useEffect(() => {
    if (editingStudent) {
      formik.setValues(editingStudent);
    }
  }, [editingStudent]);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div className="containerss">
      <h2>Thông tin sinh viên</h2>
      <form onSubmit={formik.handleSubmit} className="form-group">
        <div className="flex w-full">
          <div className="w-96">
            <label>Mã SV</label>
            <input
              type="text"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly={!!editingStudent}
            />
          </div>
          <div className="w-96 ml-60">
            <label>Họ tên</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div className="flex">
          <div className="w-96">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="w-96 ml-60">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <button type="submit">{editingStudent ? 'Cập nhật' : 'Thêm sinh viên'}</button>
      </form>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <button className='bg-slate-800' onClick={() => handleEdit(student)}>Sửa</button>
                <button className='bg-red-900' onClick={() => handleDelete(student.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
