const formatTime = (n) => (Number(n) < 10 ? "0" + Number(n) : "" + Number(n));

export default function displayTime(time) {
  if (time) {
    return (
      <div style={{ display: "inline" }}>
        {time.getFullYear()}-{formatTime(time.getMonth() + 1)}-
        {formatTime(time.getDate())}
        &nbsp;&nbsp;
        {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:
        {formatTime(time.getSeconds())}
      </div>
    );
  }
}
