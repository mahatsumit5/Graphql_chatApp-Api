import { send } from "process";
import { BaseAPI } from "./index.js";
import {
  GetMessageByRoomResponse,
  MessageByRoomIdParams,
  SendMessageResponse,
} from "../types/types.js";
import { getMessageByRoomId, sendMessage } from "../database/message.query.js";
import { SendMessageParams } from "../types/index.js";

export class MessageApi extends BaseAPI {
  /**
   * Sends a message
   * @param {string} message - The message to be sent
   * @returns {Promise<SendMessageResponse>}
   */
  async sendMessage(body: SendMessageParams): Promise<SendMessageResponse> {
    try {
      const { data, error } = await sendMessage(body);
      if (error) throw new Error(error?.message || "Failed to send message");

      return {
        status: true,
        message: "Message sent successfully",
        data,
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
    const { data, error } = await getMessageByRoomId(body);
    if (error) throw new Error(error.message);
    return {
      status: true,
      message: "Messages retrieved successfully",
      data: data.messages.reverse(),
      _count: data._count.messages,
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
