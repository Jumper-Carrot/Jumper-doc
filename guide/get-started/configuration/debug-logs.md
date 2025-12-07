# 🛠️ Debugging and Logging

This section covers how to activate debugging features and access log files for both the Carrot server and the Jumper client application.

## 🥕 Carrot Server Debugging & Logs

### 🐞 Debug Mode

The Carrot server can be launched in debug mode to obtain additional diagnostic information, particularly regarding API endpoints and internal processing.

To enable debug mode, set the following environment variable in your `.env` file:

```bash
DEBUG=True
```

> [!WARNING]
> It is not recommended to run the Carrot server with debug mode enabled in a production environment due to potential security risks and performance degradation.

### 📜 Logging Configuration

If you are running Carrot via Docker Compose (the recommended method), you can access the application logs in real-time using the standard Docker command:

```bash
docker logs -f carrot
```

The following environment variables also allow you to configure log delivery, including routing logs to a specific file:

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `CARROT_LOG_FILE` | Specifies the absolute file path where application logs should be written. | `/var/log/carrot/carrot.log` |
| `CARROT_LOG_FILE_LEVEL` | Sets the minimum logging level for the specified log file. Options include `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL`. (Default: `INFO`) | `DEBUG` |

-----

## 💻 Jumper Client Debugging

The logs for the Jumper client application are stored locally on the user's machine. You can access them by navigating to the following directory path:

  * **Windows:** `C:\Users\<YourUsername>\AppData\Local\com.jumper.app\logs\jumper.log`

> [!NOTE]
> The client log file has a fixed retention limit of 100 MB. Once this limit is reached, the log file will be automatically rotated (max 3 log files retained).
