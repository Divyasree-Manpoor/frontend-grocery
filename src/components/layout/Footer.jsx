function Footer() {
  return (
    <div className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Grocery List Manager.
      All rights reserved.
    </div>
  );
}

export default Footer;