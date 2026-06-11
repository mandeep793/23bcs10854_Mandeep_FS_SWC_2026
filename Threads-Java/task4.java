//simulate tiny kitchen with 2 chefs thread 1 and thread 2 and 2 shared tools knife and ucutting board. chef 1 needs knife then cutting board to prepare dish and chef 2 needs cutting board then knife to prepare dish. once application freezes due to deadlock, modify code to prevent deadlock to chanfe the order of tool acquisition for one chef. concept- deadlock, synchronization, locks.
public class task4 {
   public static void main(String[] args) {
    Object knife = new Object();
    Object cuttingBoard = new Object();

    Thread chef1 = new Thread(() -> {
        synchronized (knife) {
            System.out.println("Chef 1 has the knife.");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            synchronized (cuttingBoard) {
                System.out.println("Chef 1 has the cutting board and is preparing the dish.");
            }
        }
    });

    Thread chef2 = new Thread(() -> {
        synchronized (cuttingBoard) {
            System.out.println("Chef 2 has the cutting board.");
            try { Thread.sleep(100); } catch (InterruptedException e) {}
            synchronized (knife) {
                System.out.println("Chef 2 has the knife and is preparing the dish.");
            }
        }
    });

    chef1.start();
    chef2.start();
   }
}
