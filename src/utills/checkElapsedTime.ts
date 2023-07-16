export function checkElapsedTime(dateString: string): boolean {
  const targetDate = new Date(dateString);
  targetDate.setHours(targetDate.getHours() + 9); // targetDate에 9시간을 추가합니다.

  const currentDate = new Date();

  // 시간 차이를 계산합니다. (밀리초 단위)
  const elapsedTime = currentDate.getTime() - targetDate.getTime();

  // 분으로 변환하여 5분과 비교합니다.
  const elapsedMinutes = elapsedTime / 1000 / 60;
  return elapsedMinutes > 5;
}
