import splunklib.client as client
import splunklib.results as results
import re

def extract_field(raw, key):
    pattern = rf"{key}=(.+?)(?:\n|$)"
    match = re.search(pattern, raw)
    return match.group(1).strip() if match else "Not Found"

def run_spl_query(query: str):
    service = client.connect(
        host='localhost',
        port=8089,
        username='splunk',
        password='12345678'
    )
    job = service.jobs.create(f"search {query}", earliest_time="-1d", latest_time="now")


    while not job.is_done():
        pass

    output = []
    for result in results.JSONResultsReader(job.results(output_mode='json')):
        if isinstance(result, dict):
            trimmed = {
                "message": result.get("Message") or extract_field(result.get("_raw", ""), "Message"),
                "time": result.get("_time"),
                "event_code": result.get("EventCode") or extract_field(result.get("_raw", ""), "EventCode"),
                "source_type": result.get("SourceName") or extract_field(result.get("_raw", ""), "SourceName"),
                "task_category": result.get("TaskCategory") or extract_field(result.get("_raw", ""), "TaskCategory"),
                "OpCode": result.get("OpCode") or extract_field(result.get("_raw", ""), "OpCode"),
                "sourcetype": result.get("sourcetype") or extract_field(result.get("_raw", ""), "sourcetype"),
                "user": result.get("AccountName") or extract_field(result.get("_raw", ""), "Account Name"),
                "host": result.get("host") or extract_field(result.get("_raw", ""), "ComputerName"),
                "log_level": result.get("Type") or extract_field(result.get("_raw", ""), "Type"),
                "command_line": result.get("CommandLine") or extract_field(result.get("_raw", ""), "CommandLine")
            }
            output.append(trimmed)
    return output
