import { send } from "process";
import { BaseAPI } from ".";
import {
  GetMessageByRoomResponse,
  MessageByRoomIdParams,
  SendMessageResponse,
} from "../types/types";
import { getMessageByRoomId, sendMessage } from "../database/message.query";
import { SendMessageParams } from "../types";

export class MessageApi extends BaseAPI {
  /**
   * Sends a message
   * @param {string} message - The message to be sent
   * @returns {Promise<SendMessageResponse>}
   */
  async sendMessage(body: SendMessageParams): Promise<SendMessageResponse> {
    try {
      const response = await sendMessage(body);
      if (!response?.id)
        throw new Error(response?.message || "Failed to send message");

      return {
        status: true,
        message: "Message sent successfully",
        data: response,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Retrieves messages
   * @returns {Promise<GetMessageByRoomResponse>}
   */
  async getMessages(
    body: MessageByRoomIdParams
  ): Promise<GetMessageByRoomResponse> {
    const result = await getMessageByRoomId(body);
    if (!result.messages.length) throw new Error("No messages found");
    return {
      status: true,
      message: "Messages retrieved successfully",
      data: result.messages,
      _count: result._count.messages,
    };
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
