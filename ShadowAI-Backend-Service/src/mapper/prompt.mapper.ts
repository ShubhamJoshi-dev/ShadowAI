function modelResponseMapper(modelResponse: any) {
  let response = modelResponse.replace("```", "").replace(``, "");
  response = response
    .split("\n*")
    .filter((item:any) => !item.includes("``"))
    .map((item:any) => item.replace("\n", "").trim())
    .slice(1);
  return response;
}

export default modelResponseMapper;