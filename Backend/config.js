const config = {
  JWT_SECRET: process.env.JWT_SECRET || "SAKET-SECRET",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://yuko:Yuko%40123456@cluster0.iec1sgv.mongodb.net/chat",
  PORT: process.env.PORT || 5000,
};

module.exports = config;
