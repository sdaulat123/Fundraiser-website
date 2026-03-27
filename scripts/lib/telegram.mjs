export async function telegramRequest(baseUrl, token, method, payload) {
  const response = await fetch(`${baseUrl}/bot${token}/${method}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(`Telegram API error on ${method}: ${JSON.stringify(data)}`);
  }

  return data.result;
}

export async function fetchUpdates(baseUrl, token, offset, timeoutSeconds = 25) {
  return telegramRequest(baseUrl, token, "getUpdates", {
    offset,
    timeout: timeoutSeconds,
    allowed_updates: ["message"],
  });
}

export async function sendMessage(baseUrl, token, chatId, text) {
  return telegramRequest(baseUrl, token, "sendMessage", {
    chat_id: chatId,
    text,
  });
}
