const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

export async function getFolder(url: string) {
  const folderJson = await fetch(url, {
    headers: {
      Authorization: 'token ' + gitApiAuth,
    },
  });
  const folderData = await folderJson.json();

  return folderData;
}

export async function getFile(
  newUrlFile: string,
  url: string,
  userRepo: string
): Promise<string> {
  const newUrl = newUrlFile + url.split(userRepo + '/')[1];

  const filesContent = await fetch(newUrl);
  const filesData = await filesContent.text();

  return filesData;
}
