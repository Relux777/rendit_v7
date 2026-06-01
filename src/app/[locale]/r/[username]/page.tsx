type PageParams = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: PageParams) {
  const { username } = await params;
  return <h1>User: {username}</h1>;
}