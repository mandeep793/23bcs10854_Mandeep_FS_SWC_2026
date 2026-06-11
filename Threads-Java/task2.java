
class searchthread extends Thread{
   private String[] lines;
   private int start;
   private int end;
   private String word;
   private int threadid;

   public searchthread(String[] lines,int start,int end,String word,int id){
     this.lines=lines;
     this.start=start;
     this.end=end;
     this.word=word;
     this.threadid=id;
   }

  public void run(){
    boolean found=false;
    for(int i=start;i<end;i++){
      if(lines[i].contains(word)){
        found=true;
        System.out.println("thread found at line"+(i+1));
      }
    }
    if(!found){
      System.out.println("word not found");
    }
  }
  

}

public class task2 {
  public static void main(String[] args) throws InterruptedException{
    String text =
                "We are completing Java\n" +
                "Learning threading\n" +
                "Java tasks are fun\n" +
                "More practice lines\n" +
                "Thread example";
    String word="tasks";
    String[] lines=text.split("\n");
    int size=lines.length/3;

    searchthread t1=new searchthread(lines, 0, size, word, 1);
    searchthread t2=new searchthread(lines, size, size*2, word, 2);
    searchthread t3=new searchthread(lines, size*2, lines.length, word, 3);

    t1.start();
    t2.start();
    t3.start();

    t1.join();
    t2.join();
    t3.join();
  }
}
