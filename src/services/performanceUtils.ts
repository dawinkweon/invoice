export function timed<T>(fn: () => T, fnName: string): T {
  const startTime = performance.now();

  try {
    const result = fn();
    const duration = getDurationFromNow(startTime);
    console.log(
      `Function name: ${fnName} took ${duration} milliseconds to execute.`
    );
    return result;
  } catch (err) {
    const duration = getDurationFromNow(startTime);
    console.log(
      `Error while calling function name: ${fnName} and took ${duration} milliseconds to execute.`
    );
    throw err;
  }
}
function getDurationFromNow(startTime: number) {
  const endTime = performance.now();
  const duration = endTime - startTime;
  return duration;
}
