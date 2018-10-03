const Koa = require("koa");

const app = new Koa();

// asinc & await 사용.
app.use(async (ctx, next) => {
  console.log(1);
  // next()는 promise다! next를 실행하면 prmoise를 반환함.
  // next().then(() => {
  //   console.log("bye");
  // });
  await next();
  console.log("bye");
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use(ctx => {
  ctx.body = "hello world";
});

app.listen(4000, () => {
  console.log("listening to port 4000");
});
