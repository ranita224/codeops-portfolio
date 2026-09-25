export const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];
const TELEBIRR = /^(?:\+251|0)9\d{8}$/;

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  }

  if (!TELEBIRR.test(form.phone.trim())) {
    errors.phone = "Use 09… or +2519… (TeleBirr number)";
  }

  if (!AREAS.includes(form.area)) {
    errors.area = "Choose a delivery area";
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = "Notes must be 200 characters or fewer";
  }

  return errors;
}