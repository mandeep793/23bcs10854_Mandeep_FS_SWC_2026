//create a piggybank class with a balance variable. spawn 5 different thread represeting family members where each memeber attempts to add $100 to the piggybank 2000 times simultaneously.run it without synchrnication to show the students how final total fails shorts of $10000 have them use the synchronized keyword to ensure that the final total is correct. concept- synchronization

class PiggyBank {
  private int balance = 0;

  public void addMoney(int amount) {
    balance += amount;
  }

  public int getBalance() {
    return balance;
  }
}
public class task3 {
  public static void main(String[] args) throws InterruptedException {
    PiggyBank piggyBank = new PiggyBank();
    Thread[] familyMembers = new Thread[5];

    for (int i = 0; i < familyMembers.length; i++) {
      familyMembers[i] = new Thread(() -> {
        for (int j = 0; j < 2000; j++) {
          piggyBank.addMoney(100);
        }
      });
    }

    for (Thread member : familyMembers) {
      member.start();
    }

    for (Thread member : familyMembers) {
      member.join();
    }

    System.out.println("Final balance: $" + piggyBank.getBalance());
  }
}
