var parse = require("postgres-interval");
const { Duration } = require("luxon");
const interval = parse("00:01:31.233199");
console.log(interval.toPostgres());

async function stopwatch() {
  const t1 = performance.now();
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 2000);
  });
  const t2 = performance.now();
  const millis = t2 - t1;
  return millis;
}

function getInterval(millis) {
  const dur = Duration.fromMillis(millis);
  return dur.toString();
}

async function run() {
  const millis = await stopwatch();
  const interval = getInterval(millis);
  console.log(interval);
}

run();
