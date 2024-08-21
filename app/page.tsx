
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="container mx-auto p-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Project</h1>
          <div className="space-x-4">
            <Button >About</Button>
            <Button >Contact</Button>
            <Button> GitHub </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-12">
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            Welcome to My Project
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the power of AI with our ChatBot and image recognition features.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl">ChatBot</CardTitle>
              <CardDescription>Engage with our AI-powered ChatBot</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Our ChatBot is similar to Gemini, taking input and images to provide
                contextual responses.{" We've implemented"} roles for more specific interactions.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Explore Chat-Bot</Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl">Find What You See</CardTitle>
              <CardDescription>Discover the magic of image recognition</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Click below to start exploring and experiencing the magic of our
                image recognition technology!
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Find What You See</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="mt-12 bg-gray-900 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2023 My Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}