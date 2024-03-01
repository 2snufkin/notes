
## DallE
| Model    | Quality  | Resolution          | Price          |
|----------|----------|---------------------|----------------|
| DALL·E 3 | Standard | 1024×1024           | $0.040 / image |
|          | Standard | 1024×1792, 1792×1024 | $0.080 / image |
| DALL·E 3 | HD       | 1024×1024           | $0.080 / image |
|          | HD       | 1024×1792, 1792×1024 | $0.120 / image |
| DALL·E 2 |          | 1024×1024           | $0.020 / image |
|          |          | 512×512             | $0.018 / image |
|          |          | 256×256             | $0.016 / image |
### DallE 3
```python
def generate_image(prompt):
    """
    Generate an image using DALL·E from the given prompt.

    Args:
    - prompt (str): The prompt for generating the image.

    Returns:
    - image (bytes): The generated image in bytes format.
    """
    client = OpenAI()
    client.api_key = os.getenv("API_KEY")

    response = client.images.generate(
        model="dall-e-2", # or dalle-e-2 : price impact
        prompt=prompt,
        n=1,
        size="256x256", # price impact. DalleE3 doesnt support lower resolutions
    )

    image_url = response.data[0].url
    # you can just return the image url or transform it to bytes
    response = requests.get(image_url)
    return BytesIO(response.content)
```



### DallE 3
```python
def generate_image(prompt):
    """
    Generate an image using DALL·E from the given prompt.

    Args:
    - prompt (str): The prompt for generating the image.

    Returns:
    - image (bytes): The generated image in bytes format.
    """
    client = OpenAI()
    client.api_key = os.getenv("API_KEY")

    response = client.images.generate(
        model="dall-e-3", # or dalle-e-2 : price impact
        prompt=prompt,
        n=1,
        size="1024x1024", # price impact. DalleE3 doesnt support lower resolutions
        quality="standard",  # standard or hd, price impace
    )

    image_url = response.data[0].url

    # you can just return the image url or transform it to bytes
    
    response = requests.get(image_url)
    return BytesIO(response.content)
```
