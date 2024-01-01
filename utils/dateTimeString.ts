export default function convertDate(inputDate: string): string {
  try {
    // Parse the input date string
    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear());

    // Format the date
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  } catch (error) {
    console.error("Error converting date:", error);
    return "66/66/6666";
  }
}
