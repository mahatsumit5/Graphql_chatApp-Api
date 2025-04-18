import { send } from "process";
import { BaseAPI } from ".";
import {
  GetMessageByUser,
  GetMessageByUserResponse,
  SendMessageResponse,
} from "../types/types";
import { sendMessage } from "../database/message.query";
import { SendMessageParams } from "../types";

export class MessageApi extends BaseAPI {
  override baseURL = `${process.env.BASE_URL}/message/`;

  /**
   * Sends a message
   * @param {string} message - The message to be sent
   * @returns {Promise<SendMessageResponse>}
   */
  async sendMessage(body: SendMessageParams): Promise<SendMessageResponse> {
    try {
      const response = await sendMessage(body);
      if (response?.id) {
        return {
          status: true,
          message: "Message sent successfully",
          data: response,
        };
      } else {
        throw new Error(response?.message || "Failed to send message");
      }
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Retrieves messages
   * @returns {Promise<string[]>}
   */
  async getMessages({
    roomId,
    skip,
    take,
  }: GetMessageByUser): Promise<GetMessageByUserResponse> {
    // todo implement get messages logic
    return this.get(`/?id=${roomId}&take=${take}&skip=${skip}`);
  }

  /**
   * Deletes a message
   * @param {string} messageId - The ID of the message to be deleted
   * @returns {Promise<void>}
   */
  async deleteMessage(messageId: string): Promise<void> {
    // todo implement delete message logic
  }
}
