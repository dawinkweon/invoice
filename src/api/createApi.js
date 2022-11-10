export default function createApi(fn) {
  return async () => {
    let err, response;

    try {
      const result = await fn();
      response = await result.json();
    } catch (e) {
      console.error("Error occurred: " + e);
      err = e;
    }
    return { err, response };
  };
}
