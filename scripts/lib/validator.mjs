import { runCommand } from "./shell.mjs";

export async function validateBuild(rootDir, buildCommand) {
  const [command, ...args] = buildCommand.split(" ");
  await runCommand(command, args, { cwd: rootDir });
}
