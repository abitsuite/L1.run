use uuid::Uuid;

pub fn new() -> String {
    /* Generate new session id. */
    let sessionid = Uuid::new_v4();

    println!("  A new session has been created successfully!\n");
    println!("  [ {} ]\n", sessionid);

    println!("  Paste the ID shown 👆 into the Session Manager found at 👇");
    println!("  https://layer1.run/{}\n", sessionid);

    sessionid.to_string()
}
