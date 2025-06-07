import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CodeBlock from "../ui/code-block";

function CreatingSnippet() {
  return (
    <section id="creating-snippets" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Creating Snippets</h2>
        <p className="text-lg text-muted-foreground">
          Learn how to create and manage your code snippets.
        </p>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Adding a New Snippet</h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Click the &quot;New Snippet&quot; button in your dashboard</li>
          <li>Fill in the snippet details:</li>
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
            <li>
              <strong>Title:</strong> A descriptive name for your snippet
            </li>
            <li>
              <strong>Description:</strong> What the snippet does
            </li>
            <li>
              <strong>Language:</strong> Programming language (TypeScript,
              JavaScript, etc.)
            </li>
            <li>
              <strong>Category:</strong> Organize by type (hooks, utils,
              components, etc.)
            </li>
            <li>
              <strong>Code:</strong> Your actual code snippet
            </li>
          </ul>
          <li>Optionally generate an install command for CLI usage</li>
          <li>Save your snippet</li>
        </ol>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Example: React Hook</CardTitle>
          <CardDescription>
            A custom hook for managing localStorage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock
            language="typescript"
            code={`import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}`}
          />
        </CardContent>
      </Card>
    </section>
  );
}

export default CreatingSnippet;
