import bcrypt from "bcrypt";

/**
 * 使用 bcrypt 加密密码
 * @param password - 要加密的密码
 * @returns Promise<string> - 加密后的密码哈希
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // 加密轮数
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// 测试密码加密
async function main() {
  const password = "123456";
  const hashedPassword = await hashPassword(password);
  console.log("原始密码:", password);
  console.log("加密后的密码:", hashedPassword);

  // 验证密码
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log("密码验证结果:", isValid);
}

main().catch(console.error);
