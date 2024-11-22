import dash
from dash import dcc
from dash import html
import plotly.express as px
import pandas as pd

# Create a Dash application
app = dash.Dash(__name__)

# Create a sample DataFrame
df = pd.read_csv("Sleep_Data__Last_30_Days_.csv")
df['Date'] = pd.to_datetime(df['Date'])

# Create a Plotly figure
fig = px.line(
    df, 
    title='Hours Slept Over the Last 30 Days',
    x='Date', 
    y='Hours Slept',
    # trendline='ols',
    template='plotly_dark'
)

# Save the figure to an HTML file
fig.write_html("figure.html")

# # Define the layout of the Dash application
# app.layout = html.Div(children=[
#     html.H1(children='My Plotly Graph'),

#     dcc.Graph(
#         id='example-graph',
#         figure=fig
#     )
# ])

# # Run the Dash application
# if __name__ == '__main__':
#     app.run_server(debug=True)