import config from "../config";

import { Client, Databases, Storage, Query, ID } from "appwrite";

export class DbService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getQuestions(queries = [Query.equal("difficulty", "easy")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteQuestionCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getQuestions() :: ", error);
      return false;
    }
  }

  async getQuizzes() {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteQuizCollectionId
      );
    } catch (error) {
      console.log("Appwrite service :: getQuizzes() :: ", error);
      return false;
    }
  }

  async createQuiz({ quizTitle, questions, createdBy }) {
    try {
      const createdAt = new Date().toISOString(); // Get the current timestamp in ISO format

      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteQuizCollectionId, // This should be your quizzes collection ID
        ID.unique(),
        {
          quizTitle,
          questions,
          createdBy,
          createdAt,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createQuiz() :: ", error);
      return false;
    }
  }

  async createQuestion({
    title,
    type,
    difficulty = "easy",
    userId,
    options,
    answers,
    tags = [],
  }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteQuestionCollectionId,
        ID.unique(),
        {
          title,
          type,
          difficulty,
          userId,
          options,
          answers,
          tags,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createQuestion() :: ", error);
      return false;
    }
  }
  async deleteQuestion(docId) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteQuestionCollectionId,
        docId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteQuestion() :: ", error);
      return false;
    }
  }

  //storage service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile() :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(config.appWriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appWriteBucketId, fileId).href;
    } catch (error) {
      console.log("Appwrite service :: deleteFile() :: ", error);
      return false;
    }
  }
}

const dbService = new DbService();

export default dbService;
