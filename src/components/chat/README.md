# Chat UI Components

A complete ChatGPT-like chat interface built with React, TypeScript, and shadcn/ui components with full markdown support.

## Features

- ✅ **ChatGPT-like Interface**: Modern, clean design similar to OpenAI's ChatGPT
- ✅ **Mobile Responsive**: Optimized for all mobile screen sizes and devices
- ✅ **Markdown Support**: Full markdown rendering with syntax highlighting
- ✅ **Streaming Responses**: Real-time streaming of AI responses
- ✅ **Message Management**: Copy, regenerate, and clear messages
- ✅ **Auto-scroll**: Smart scrolling behavior with manual override
- ✅ **Touch-friendly**: Optimized touch targets and gestures for mobile
- ✅ **TypeScript**: Full type safety
- ✅ **Accessibility**: ARIA labels and keyboard navigation
- ✅ **Error Handling**: Comprehensive error states and retry logic
- ✅ **Copy Functionality**: Copy messages and code blocks with visual feedback

## Components

### ChatInterface

The main chat component that combines all sub-components.

```tsx
import { ChatInterface } from "@/components/chat";

<ChatInterface
  messages={messages}
  onSendMessage={handleSendMessage}
  onClearChat={handleClearChat}
  onRegenerateResponse={handleRegenerateResponse}
  isLoading={isLoading}
  onStopGeneration={handleStopGeneration}
  title="AI Assistant"
  welcomeMessage="How can I help you today?"
/>;
```

### ChatMessage

Individual message component with markdown support.

```tsx
import { ChatMessage } from "@/components/chat";

<ChatMessage
  message={{
    id: "1",
    content: "Hello world",
    role: "user",
    timestamp: new Date(),
  }}
  isLoading={false}
/>;
```

### ChatInput

Input component with auto-resize and keyboard shortcuts.

```tsx
import { ChatInput } from "@/components/chat";

<ChatInput
  onSendMessage={handleSendMessage}
  isLoading={isLoading}
  onStopGeneration={handleStopGeneration}
  placeholder="Type your message..."
/>;
```

### ChatPage

Production-ready page component with error handling.

```tsx
import { ChatPage } from "@/components/chat";

<ChatPage
  apiEndpoint="/api/chat"
  title="Legal AI Assistant"
  welcomeMessage="How can I help with your legal questions?"
/>;
```

## Hook Usage

### useChat

A powerful hook for managing chat state and API calls.

```tsx
import { useChat } from "@/hooks/use-chat";

const {
  messages,
  isLoading,
  error,
  sendMessage,
  clearMessages,
  regenerateResponse,
  stopGeneration,
  retry,
} = useChat({
  api: "/api/chat",
  onError: (error) => console.error(error),
});
```

## Message Interface

```typescript
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}
```

## API Endpoint

The chat components expect a streaming API endpoint that returns Server-Sent Events (SSE):

```typescript
// /api/chat/route.ts
export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  // Create streaming response
  const stream = new ReadableStream({
    async start(controller) {
      // Stream response chunks
      const chunk = `data: ${JSON.stringify({ content: "Hello" })}\n\n`;
      controller.enqueue(encoder.encode(chunk));

      // End stream
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

## Markdown Features

The chat interface supports:

- **Code blocks** with syntax highlighting
- **Tables** with proper formatting
- **Lists** (ordered and unordered)
- **Links** and **images**
- **Blockquotes**
- **Inline code**
- **Bold** and _italic_ text
- **Headings** (H1-H6)

## Styling

The components use Tailwind CSS and shadcn/ui for consistent styling:

- Light/dark mode support
- Responsive design
- Accessible color contrast
- Smooth animations
- Modern glassmorphism effects

## Dependencies

Required packages:

```json
{
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "react-syntax-highlighter": "^15.6.1",
  "@types/react-syntax-highlighter": "^15.5.13"
}
```

## Usage Examples

### Basic Chat

```tsx
import { ChatInterface } from "@/components/chat";

function BasicChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content,
        role: "user",
        timestamp: new Date(),
      },
    ]);

    // Handle API call...
  };

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );
}
```

### With Custom Styling

```tsx
<ChatInterface
  messages={messages}
  onSendMessage={handleSendMessage}
  className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
  title="Custom AI Assistant"
  welcomeMessage="Welcome to our custom chat interface!"
/>
```

## Accessibility

- Screen reader support with ARIA labels
- Keyboard navigation (Tab, Enter, Escape)
- High contrast mode support
- Focus management
- Semantic HTML structure

## Mobile Optimizations

The chat interface is fully optimized for mobile devices with the following features:

### Screen Size Adaptations

- **Small screens (< 640px)**: Compact layout with smaller avatars and reduced spacing
- **Medium screens (640px - 1024px)**: Balanced layout with optimal touch targets
- **Large screens (> 1024px)**: Full desktop experience with maximum content area

### Touch-Friendly Design

- **44px minimum touch targets** for all interactive elements
- **Optimized button sizes** for thumb navigation
- **Proper spacing** between clickable elements
- **Swipe-friendly scrolling** with momentum

### Mobile-Specific Features

- **Adaptive header height**: Smaller on mobile to maximize content area
- **Responsive input**: Auto-resizing with mobile keyboard consideration
- **Simplified UI**: Hidden timestamps and condensed actions on small screens
- **Optimized typography**: Smaller font sizes and better line spacing
- **Viewport handling**: Proper support for mobile browser UI changes

### Performance Optimizations

- **Smooth scrolling** with hardware acceleration
- **Efficient rendering** for long chat conversations
- **Minimal layout shifts** during typing and responses
- **Optimized images** and assets for mobile bandwidth

### Accessibility

- **Screen reader support** on all mobile devices
- **Voice control compatibility**
- **High contrast support** for better visibility
- **Keyboard navigation** for external keyboards

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES2020 support

## Contributing

1. Follow the existing code style
2. Add TypeScript types for all props
3. Include accessibility attributes
4. Test on mobile devices
5. Update documentation for new features
