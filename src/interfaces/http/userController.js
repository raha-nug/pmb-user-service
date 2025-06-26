import * as userApplicationService from "../../application/userAplicationService.js";

export const register = async (req, res) => {
  try {
    const user = await userApplicationService.registerUserUseCase(req.body);
    res.status(201).json({
      message: "Registrasi berhasil",
      data: user,
    });
  } catch (error) {
    console.error("Error saat registrasi:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const login = async (req, res) => {
  try {
    const { token } = await userApplicationService.loginUserUseCase(req.body);
    res.status(200).json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(401).json({ message: "Email atau password salah" });
  }
};
