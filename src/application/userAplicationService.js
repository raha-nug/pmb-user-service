import jwt from "jsonwebtoken";
import * as userDomain  from "../domain/userDomain.js";
import { userRepository } from "../infrastructure/userRepository.js";

export const registerUserUseCase = async (registrationData) => {
  // 1. Validasi di level aplikasi (jika ada, misal cek duplikasi email)
  const existingUser = await userRepository.findByEmail(registrationData.email);
  if (existingUser) {
    throw new Error("User dengan email ini sudah terdaftar.");
  }

  // 2. Gunakan fungsi domain untuk membuat data user yang valid
  const newUserData = await userDomain.createNewUserData({
    email: registrationData.email,
    plainPassword: registrationData.password,
    nama: registrationData.nama,
  });

  // 3. Simpan data menggunakan fungsi repository
  const savedUser = await userRepository.save(newUserData);

  // Di sini kita bisa mempublikasikan Domain Event secara fungsional
  // misal: publishEvent('AkunBerhasilDibuat', { userId: savedUser.id });

  // Hilangkan password dari data yang dikembalikan
  const { password, ...userToReturn } = savedUser;
  return userToReturn;
};


export const loginUserUseCase = async ({ email, password }) => {
  // 1. Cari user menggunakan repository
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error("Email atau password salah.");
  }

  // 2. Gunakan fungsi domain untuk memvalidasi password
  const isValid = await userDomain.isPasswordValid(password, user.password);
  if (!isValid) {
    throw new Error("Email atau password salah.");
  }

  // 3. Buat token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
};
