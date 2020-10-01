resource "null_resource" "test_resource" {
  provisioner "local-exec" {
    command = "echo Hello from Terraform!"
  }
}