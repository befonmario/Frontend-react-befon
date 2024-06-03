import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
  // State untuk menyimpan data profil pengguna
  const [profileData, setProfileData] = useState(null);
  // State untuk menyimpan nilai inputan
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: ''
  });
  // Mendapatkan nama pengguna dari parameter URL
  const { name } = useParams();

  // Mengambil data profil pengguna dari API dengan otentikasi JWT
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Mendapatkan token JWT dari penyimpanan lokal (misalnya, localStorage)
        const token = localStorage.getItem('token'); // Pastikan Anda menyimpan token setelah login
        const response = await fetch(`http://localhost:3000/users/profile/${name}`, {
          headers: {
            Authorization: `Bearer ${token}` // Menyertakan token JWT dalam header Authorization
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          // Mengisi nilai awal inputan dengan data profil
          setFormData({
            username: data.username,
            name: data.name,
            email: data.email
          });
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [name]); // Memastikan pengambilan data hanya terjadi saat nama pengguna berubah

  // Fungsi untuk menangani perubahan inputan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fungsi untuk menangani pembaruan data profil pengguna
  const handleUpdateProfile = async () => {
    try {
      // Mendapatkan token JWT dari penyimpanan lokal (misalnya, localStorage)
      const token = localStorage.getItem('token'); // Pastikan Anda menyimpan token setelah login
      // Data yang akan diperbarui
      const updatedData = { ...profileData, ...formData }; // Menggunakan nilai inputan yang telah diubah
      const response = await fetch(`http://localhost:3000/users/profile/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Menyertakan token JWT dalam header Authorization
        },
        body: JSON.stringify(updatedData)
      });
      if (response.ok) {
        // Jika pembaruan berhasil, kita dapat memperbarui state lokal dengan data yang diperbarui
        setProfileData(updatedData);
        Swal.fire({
            title: "Success!",
            text: "Successfully Updated!",
            icon: "success",
            timer: 2000,
            timerProgressBar: true
          });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Profile</h2>
        {profileData ? (
          <form>
            <div style={{ marginBottom: '16px' }}>
              <label>Username:</label>
              <Input
                name="username"
                value={formData.username}
                placeholder={profileData.username}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label>Name:</label>
              <Input
                name="name"
                value={formData.name}
                placeholder={profileData.name}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label>Email:</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                placeholder={profileData.email}
                onChange={handleInputChange}
              />
            </div>
            <Button type="primary" onClick={handleUpdateProfile}>Update</Button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
