//Kode untuk mengelola domain pengguna

import bcrypt from "bcryptjs";

export const createNewUserData = async ({ email, plainPassword, nama }) => {
  // Validasi email
  if (!email || !email.includes("@")) {
    throw new Error("Email tidak valid.");
  }

  // Validasi password
  if (!plainPassword || plainPassword.length < 8) {
    throw new Error("Password harus minimal 8 karakter.");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Kembalikan data pengguna baru
  return {
    email,
    password: hashedPassword,
    nama,
    role: "ADMIN", // Default role
  };
};

export const isPasswordValid = async (plainPassword, hashedPassword) => {
  // Validasi password
  if (!plainPassword || !hashedPassword) {
    throw new Error("Password tidak boleh kosong.");
  }

  // Cek kecocokan password
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  if (!isMatch) {
    throw new Error("Password tidak valid.");
  }

  return true;
};

export const updateUserData = (user, updateData) => {
  // Validasi data yang akan diupdate
  if (updateData.email && !updateData.email.includes("@")) {
    throw new Error("Email tidak valid.");
  }

  // Update data pengguna
  return {
    ...user,
    ...updateData,
    password: user.password, // Jangan ubah password jika tidak diupdate
  };
};

