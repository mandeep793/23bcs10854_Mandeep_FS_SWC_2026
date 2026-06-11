//recreate flight seat booking system where 100 users are trying to book the last 10 seats simultaneously. without synchronization, use java's atomicinteger or AtomicBoolean to ensure no duplicate seats are assigned and program never oversells.
// concepts- java.util.concurrent.atmoic

import java.util.concurrent.atomic.AtomicInteger;
class AtmoicInteger {
  private int value;

  public void AtomicInteger(int initialValue) {
    this.value = initialValue;
  }

  public int get() {
    return value;
  }

  public int getAndDecrement() {
    return value--;
  }
}
public class task5 {
  public static void main(String[] args) {
    int totalSeats = 10;
    AtomicInteger availableSeats = new AtomicInteger(totalSeats);

    Runnable bookSeat = () -> {
      if (availableSeats.get() > 0) {
        int seatNumber = totalSeats - availableSeats.getAndDecrement();
        if (seatNumber <= totalSeats) {
          System.out.println("Seat " + seatNumber + " booked successfully.");
        } else {
          System.out.println("No more seats available.");
        }
      } else {
        System.out.println("No more seats available.");
      }
    };

    Thread[] users = new Thread[100];
    for (int i = 0; i < users.length; i++) {
      users[i] = new Thread(bookSeat);
    }

    for (Thread user : users) {
      user.start();
    }
  }
}
