"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from '@/messages.json';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

//integrate ai

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-600">
          <section className="bg-slate-500 text-white py-20 rounded-lg">
        <div className="container mx-auto px-4 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                <span className="hero-text">Connect and Chat</span>
            </h1>
            <p className="text-lg md:text-xl text-center mb-8">Stay connected with your friends and colleagues with our secure messaging app.</p>
            <div className="flex space-x-4">
                <a href="#" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300">Get Started</a>
                <a href="#" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-500 py-3 px-6 rounded-lg text-lg font-semibold transition duration-300">Learn More</a>
            </div>
        </div>
    </section>

      <Carousel plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full max-w-lg md:max-w-xl">
        <CarouselContent>
          {messages.map((messages,index)=>{
            return(<>
              <CarouselItem>
                <Card>
                  <CardHeader>
                    <CardTitle>{messages.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <div>
                      <p>{messages.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {messages.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              </>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </main>
  );
}
