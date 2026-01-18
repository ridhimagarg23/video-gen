import os
import time
import replicate
from dotenv import load_dotenv

load_dotenv()

def generate_video_with_replicate(prompt: str, model: str = "minimax/video-01"):
    """
    Generates a single video using Replicate and returns:
    - video_url (str)
    - prediction_id (str)
    - time_taken_sec (int)
    """

    replicate_token = os.getenv("REPLICATE_API_TOKEN")
    if not replicate_token:
        raise Exception("REPLICATE_API_TOKEN is missing in .env")

    # token set (no prints)
    os.environ["REPLICATE_API_TOKEN"] = replicate_token

    start_time = time.time()

    prediction = replicate.predictions.create(
        model=model,
        input={"prompt": prompt}
    )

    while prediction.status not in ["succeeded", "failed", "canceled"]:
        time.sleep(5)
        prediction = replicate.predictions.get(prediction.id)

    time_taken_sec = int(time.time() - start_time)

    if prediction.status == "succeeded":
        video_url = prediction.output[0] if isinstance(prediction.output, list) else prediction.output
        return video_url, prediction.id, time_taken_sec

    raise Exception(f"Video generation failed: {prediction.error}")
