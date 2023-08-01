const wait100ms = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 100);
  });

export const SlowComponent = async () => {
  console.log("Render SlowComponent");
  await wait100ms();
  return (
    <div>
      This is an async component that has an await statement in it but it can
      still be serverside rendered!
    </div>
  );
};
