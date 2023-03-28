import axios from 'axios';

const gitApiAuth = process.env.GITHUB_ACCESS_TOKEN;

export async function getFolder(url: string) {
  const folderJson = await axios.get(url, {
    headers: {
      Authorization: 'token ' + gitApiAuth,
    },
  });
  const folderData = folderJson.data;

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
