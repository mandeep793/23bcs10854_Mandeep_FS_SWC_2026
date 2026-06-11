//create a program that spawns 2 threads. Thread A should print a countdown from 10 to 1 with a 1-second delay between numbers using thread.sleep() . thread B should print blast off as soon as thread A finishes.
// concept- Thread.sleep() ,Thread.join() , implementing Runnable vs extending Thread.

class thread1 implements Runnable{     //countdown thread             
     @Override
     public void run(){
      try{
      for(int i=10;i>=1;i--){
        System.out.println(i);
        Thread.sleep(1000);
      }
    }
    catch(InterruptedException e){
      System.out.println("countdown error");;
    }
     }
}
class thread2 extends Thread{
   //blast off thread
   @Override
   public void run(){
    System.out.println("Blast Off");
   }
}
public class task1{
public static void main(String[] args){
   Thread t1=new Thread(new thread1());
   thread2 t2=new thread2();
   t1.start();
   try{
    t1.join();
   }
   catch(InterruptedException e){
    System.out.println("main thread interuupted");
   }
   t2.start();
}
}