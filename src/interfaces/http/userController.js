import * as userApplicationService from "../../application/userAplicationService.js";

export const register = async (req, res) => {
  try {
    const user = await userApplicationService.registerUserUseCase(req.body);
    res.status(201).json({
      message: "Registrasi berhasil",
      data: user,
    });

    //send email
    await fetch(
      `${process.env.NOTIFIKASI_SERVICE_URL}/api/notifikasi/handle-event`,
      {
        body: {
          eventType: "AkunBerhasilDibuatEvent",
          payload: {
            nama: user.nama,
            email: user.email,
          },
        },
      }
    );
  } catch (error) {
    console.error("Error saat registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const login = async (req, res) => {
  try {
    const loginData = await userApplicationService.loginUserUseCase(req.body);

    const { password, ...userToReturn } = loginData.data;

    const expiredAt = Date.now() + 24 * 60 * 60 * 1000;

    res.cookie("token", loginData.token, {
      httpOnly: true, // Tidak bisa diakses JS
      secure: true,
      sameSite: "none",
      expires: new Date(expiredAt),
    });

    res.status(200).json({
      message: "Login berhasil",
      token: loginData.token,
      data: userToReturn,
    });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(401).json({ message: "Email atau password salah" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userApplicationService.getAllUsersUseCase();
    res.status(200).json({
      message: "Berhasil mendapatkan semua pengguna",
      data: users,
    });
  } catch (error) {
    console.error("Error saat mendapatkan semua pengguna:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userApplicationService.getUserByIdUseCase(userId);
    res.status(200).json({
      message: "Berhasil mendapatkan pengguna",
      data: user,
    });
  } catch (error) {
    console.error("Error saat mendapatkan pengguna:", error);
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await userApplicationService.updateUserUseCase(
      userId,
      req.body
    );
    res.status(200).json({
      message: "Pengguna berhasil diperbarui",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error saat memperbarui pengguna:", error);
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await userApplicationService.deleteUserUseCase(userId);
    res.status(200).json({
      message: "Pengguna berhasil dihapus",
    });
  } catch (error) {
    console.error("Error saat menghapus pengguna:", error);
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
};
