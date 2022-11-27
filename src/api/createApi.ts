export type ApiResponse = {
  err?: string;
  response: any;
};

export default async function createApi(
  fn: () => Promise<Response>
): Promise<ApiResponse> {
  let err, response;
  try {
    const result = await fn();
    response = await result.json();
  } catch (e) {
    console.error("Error occurred: " + e);
    err = e;
  }
  return { err, response };
}
