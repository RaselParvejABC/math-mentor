export async function reviewAddAction({ request }) {
  const requestBody = Object.fromEntries(await request.formData());
  requestBody.rating = parseInt(requestBody.rating);
  const response = await fetch(
    `${process.env.REACT_APP_MathMentorServer}/review`,
    {
      method: request.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  const responseBody = await response.json();
  return responseBody;
}
