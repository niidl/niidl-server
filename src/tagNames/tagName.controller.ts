import * as tagNameModel from './tagName.model';
import { Request, Response } from 'express';

export async function index(req: Request, res: Response) {
  try {
    const allTagNames = await tagNameModel.getAllTags();
    res.status(200).send(allTagNames);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function tagIndex(req: Request, res: Response){
  try {
    const tagNamesOnly = await tagNameModel.getTagsOnly();
    res.status(200).send(tagNamesOnly);
  } catch (error: any){
    res.status(500).send(error.message)
  }
}

export async function langIndex(req: Request, res: Response){
  try {
    const languageTagsOnly = await tagNameModel.getLanguageOnly();
    res.status(200).send(languageTagsOnly);
  } catch (error: any){
    res.status(500).send(error.message)
  }
}